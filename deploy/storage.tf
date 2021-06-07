resource "azurerm_storage_account" "mdkb" {
  name                     = "${azurerm_resource_group.mdkb.name}-sa"
  resource_group_name      = azurerm_resource_group.mdkb.name
  location                 = azurerm_resource_group.mdkb.location
  account_tier             = "Standard"
  account_kind             = "StorageV2"
  account_replication_type = "LRS"

  blob_properties {
    delete_retention_policy {
      days = 7
    }
  }
}

resource "azurerm_storage_container" "mdkb" {
  name                  = "${azurerm_resource_group.mdkb.name}-sc"
  storage_account_name  = azurerm_storage_account.mdkb.name
  container_access_type = "private"
}

output "mdkb_storage_id" {
  value = azurerm_storage_account.mdkb.id
}

output "mdkb_storage_connection_string" {
    value = azurerm_storage_account.mdkb.primary_connection_string
}

output "mdkb_storage_container" {
  value = azurerm_storage_container.mdkb.name
}