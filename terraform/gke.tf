variable "gke_username" {
  description = "gke username"
}
 
variable "gke_password" {
  description = "gke password"
  sensitive   = true
}

variable "credentials_path" {
  description = "credentials_path"
  sensitive   = true
}


# GKE cluster
variable "project_id" {
  default = "mint-361505"
}

variable "region" {
  default = "europe-west1"
}

provider "google" {
  project = var.project_id
  region = var.project_id
  credentials = file(var.credentials_path)
}

provider "google-beta" {
  project = var.project_id
  region = var.project_id
  credentials = file(var.credentials_path)
}


resource "google_container_cluster" "primary" {
  name     = "${var.project_id}-gke"
  location = var.region
  project = var.project_id

  ip_allocation_policy {}
  enable_autopilot = true
}


resource "google_artifact_registry_repository" "primary" {
  provider = google-beta

  location = "europe-west1"
  repository_id = "grpc-cornerstone"
  description = "grpc-cornerstone docker repository"
  format = "DOCKER"
}
