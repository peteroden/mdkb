terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
    }
    github = {
      source = "integrations/github"
    }
  }
}

provider "azurerm" {
  features {
    
  }
}

resource "random_string" "mdkb" {
  length           = 3
  special          = false
}

resource "azurerm_resource_group" "mdkb" {
  name     = "mdkb${random_string.mdkb.id}"
  location = "East US"
}