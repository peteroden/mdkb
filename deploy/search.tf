locals {
  search_service_name    = "${azurerm_resource_group.mdkb.name}-srch"

  index_name             = "${local.search_service_name}-index"
  data_source_name       = "${local.search_service_name}-data"
  indexer_name           = "${local.search_service_name}-indexer"

  raw_index_config = templatefile("${path.module}/search/index.json", { index_name = local.index_name })
  index_config     = replace(replace(local.raw_index_config, "\n", " "), "\"", "\\\"")

  data_source_parameters = {
    data_source_name = local.data_source_name
    storage_id       = azurerm_storage_account.mdkb.id
    container_name   = var.search_container_name
  }
  raw_data_source_config = templatefile("${path.module}/search/datasource.json", local.data_source_parameters)
  data_source_config     = replace(replace(local.raw_data_source_config, "\n", " "), "\"", "\\\"")

  indexer_parameters = {
    indexer_name     = local.indexer_name
    data_source_name = local.data_source_name
    index_name       = local.index_name
  }

  raw_indexer_config = templatefile("${path.module}/search/indexer.json", local.indexer_parameters)
  indexer_config     = replace(replace(local.raw_indexer_config, "\n", " "), "\"", "\\\"")
}

resource "azurerm_search_service" "mdkb" {
  name                = local.search_service_name
  resource_group_name = azurerm_resource_group.mdkb.name
  location            = azurerm_resource_group.mdkb.location
  sku                 = "standard"

  identity {
    type = "SystemAssigned"
  }
}

# PUT request to create Cognitive Search data source
resource "null_resource" "search_data_source" {
  triggers = {
    configuration = sha256(local.data_source_config)
  }
  provisioner "local-exec" {
    command = <<EOF
      curl --location --request PUT "https://${local.search_service_name}.search.windows.net/datasources/${local.data_source_name}?api-version=2019-05-06" \
        --header "api-key: ${azurerm_search_service.mdkb.primary_key}" \
        --header "Content-Type: application/json" \
        --data "${local.data_source_config}"
    EOF
  }
  depends_on = [
    azurerm_role_assignment.search_rda,
    azurerm_role_assignment.search_sbdr
  ]
}

# PUT request to create Cognitive Search index
resource "null_resource" "search_index" {
  triggers = {
    configuration = sha256(local.index_config)
  }
  provisioner "local-exec" {
    command = <<EOF
      curl --location --request PUT "https://${local.search_service_name}.search.windows.net/indexes/${local.index_name}?api-version=2019-05-06" \
        --header "api-key: ${azurerm_search_service.mdkb.primary_key}" \
        --header "Content-Type: application/json" \
        --data "${local.index_config}"
    EOF
  }
  depends_on = [ azurerm_template_deployment.search_identity ]
}

# PUT request to create Cognitive Search indexer
resource "null_resource" "search_indexer" {
  triggers = {
    configuration = sha256(local.indexer_config)
  }
  provisioner "local-exec" {
    command = <<EOF
      curl --location --request PUT "https://${local.search_service_name}.search.windows.net/indexers/${local.indexer_name}?api-version=2019-05-06" \
        --header "api-key: ${azurerm_search_service.instance.primary_key}" \
        --header "Content-Type: application/json" \
        --data "${local.indexer_config}"
    EOF
  }
  depends_on = [
    null_resource.search_data_source,
    null_resource.search_index,
  ]
}
