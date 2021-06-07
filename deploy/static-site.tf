locals  {
  api_token_var = "AZURE_STATIC_WEB_APPS_API_TOKEN"
}

output hostname {
  value = azurerm_static_site.mdkb.default_host_name
}

resource "azurerm_static_site" "mdkb" {
  name                = azurerm_resource_group.mdkb.name
  location            = azurerm_resource_group.mdkb.location
  resource_group_name = azurerm_resource_group.mdkb.name
}

resource "github_actions_secret" "mdkb" {
  repository       = azurerm_resource_group.mdkb.name
  secret_name      = local.api_token_var
  plaintext_value  = azurerm_static_site.mdkb.api_key
}

resource "github_repository_file" "mdkb" {
  repository          = azurerm_resource_group.mdkb.name
  branch              = "main"
  file                = ".github/workflows/azure-static-web-app.yml"
  content             = templatefile("./azure-static-web-app.tpl",
    {
      app_location = "client"
      api_location = "api"
      output_location = ""
      api_token_var = local.api_token_var
    }
  )
}

output "mdkb_hostname" {
  value = azurerm_static_site.mdkb.default_host_name
}