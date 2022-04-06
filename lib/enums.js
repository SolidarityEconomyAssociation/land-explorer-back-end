"use strict";
var OrganisationType;
(function (OrganisationType) {
    OrganisationType["Commercial"] = "commercial";
    OrganisationType["CommunityInterest"] = "community-interest";
})(OrganisationType || (OrganisationType = {}));
var OrganisationSubType;
(function (OrganisationSubType) {
    OrganisationSubType["CommunityEnergy"] = "community-energy";
    OrganisationSubType["CommunityGrowing"] = "community-growing";
    OrganisationSubType["CommunityGroup"] = "community-group";
    OrganisationSubType["Coop"] = "coop";
    OrganisationSubType["NeighbourhoodPlanning"] = "neighbourhood-planning";
    OrganisationSubType["RentersUnion"] = "renters-union";
    OrganisationSubType["WoodlandEnterprise"] = "woodland-enterprise";
    OrganisationSubType["LocalAuthority"] = "local-authority";
    OrganisationSubType["PowerNetwork"] = "power-network";
    OrganisationSubType["UtilityCompany"] = "utility-company";
    OrganisationSubType["Other"] = "other";
})(OrganisationSubType || (OrganisationSubType = {}));
module.exports = { OrganisationType, OrganisationSubType };
