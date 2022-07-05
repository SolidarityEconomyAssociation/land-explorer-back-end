import { Request, ResponseToolkit, ResponseObject, ServerRoute } from "@hapi/hapi";
import { findDataGroupsByUserId } from "../queries/query";

type DataGroupRequest = Request & {
    auth: {
        artifacts: {
            user_id: number
        }
    }
};

async function getUserDataGroups(request: DataGroupRequest, h: ResponseToolkit): Promise<ResponseObject> {
    console.log("this gets called")

    const dataGroups = await findDataGroupsByUserId(request.auth.artifacts.user_id)

    return h.response(dataGroups);
}

export const markerRoutes: ServerRoute[] = [
    { method: "GET", path: "/api/userdatagroups", handler: getUserDataGroups },
];