import { Request, ResponseToolkit, ResponseObject, ServerRoute } from "@hapi/hapi";
import { findDataGroupsByUserId } from "../queries/query";

async function getDataGroups(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    const dataGroups = await findDataGroupsByUserId(request.auth.artifacts.user_id)

    return h.response(dataGroups);
}

export const markerRoutes: ServerRoute[] = [
    { method: "GET", path: "/api/datagroups", handler: getDataGroups },
];