enum OrganisationType {
  Commercial = "commercial",
  CommunityInterest = "community-interest",
}

enum OrganisationSubType {
  CommunityEnergy = "community-energy",
  CommunityGrowing = "community-growing",
  CommunityGroup = "community-group",
  Coop = "coop",
  NeighbourhoodPlanning = "neighbourhood-planning",
  RentersUnion = "renters-union",
  WoodlandEnterprise = "woodland-enterprise",
  LocalAuthority = "local-authority",
  PowerNetwork = "power-network",
  UtilityCompany = "utility-company",
  Other = "other",
}

module.exports = { OrganisationType, OrganisationSubType }