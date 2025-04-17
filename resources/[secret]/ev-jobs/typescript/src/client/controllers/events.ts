import { Vector } from "@shared/classes/vector";
import { SetWayPoint } from "client/utils/tools";
import { JobCheckOut } from "./npcs";

export async function InitEvents(): Promise<void> {
    console.log("[JOBS] Loading");
}

RegisterUICallback("ev-ui:getJobCenterJobs", async (data: any, cb: Function) => {
    const [jobs, success] = await RPC.execute<[MappedJob[], boolean]>("phone:getJobCenterJobs");
    cb({ data: jobs, meta: { ok: success == false, message: success || "" } });
    emit("ev:jobs:jobCenterJobs", jobs);
});

RegisterUICallback("ev-ui:createJobCenterGroup", (data: any, cb: Function) => {
    RPC.execute("phone:createJobCenterGroup", data.requestId, data.character.id);
    cb({ data: {}, meta: { ok: true, message: "" } });
});

RegisterUICallback("ev-ui:requestToJoinJobCenterGroup", async (data: any, cb: Function) => {
    RPC.execute("phone:requestToJoinJobCenterGroup", data.requestId, data.character.id, data.group.id);
    cb({ data: {}, meta: { ok: true, message: "" } });
});

RegisterUICallback("ev-ui:requestToJoinJobCenterGroupCancel", async (data: any, cb: Function) => {
    RPC.execute("phone:requestToJoinJobCenterGroupCancel", data.requestId, data.character.id, data.group.id);
    cb({ data: {}, meta: { ok: true, message: "" } });
});

RegisterUICallback("ev-ui:requestToJoinJobCenterGroupAccept", async (data: any, cb: Function) => {
    RPC.execute("phone:requestToJoinJobCenterGroupAccept", data.request_id, data.group_id, data.member_id);
    cb({ data: {}, meta: { ok: true, message: "" } });
});

RegisterUICallback("ev-ui:requestToJoinJobCenterGroupReject", async (data: any, cb: Function) => {
    RPC.execute("phone:requestToJoinJobCenterGroupReject", data.request_id, data.group_id, data.member_id);
    cb({ data: {}, meta: { ok: true, message: "" } });
});

RegisterUICallback("ev-ui:jobCenterGroupDisband", async (data: any, cb: Function) => {
    RPC.execute("phone:jobCenterGroupDisband", data.group_id, data.character.id);
    cb({ data: {}, meta: { ok: true, message: "" } });
});

RegisterUICallback("ev-ui:jobCenterGroupLeave", async (data: any, cb: Function) => {
    RPC.execute("phone:jobCenterGroupLeave", data.group_id, data.character.id);
    cb({ data: {}, meta: { ok: true, message: "" } });
});

RegisterUICallback("ev-ui:jobCenterGroupRemove", async (data: any, cb: Function) => {
    RPC.execute("phone:jobCenterGroupRemove", data.group_id, data.member_id);
    cb({ data: {}, meta: { ok: true, message: "" } });
});

RegisterUICallback("ev-ui:jobCenterGroupPromote", async (data: any, cb: Function) => {
    RPC.execute("phone:jobCenterGroupPromote", data.group_id, data.member_id);
    cb({ data: {}, meta: { ok: true, message: "" } });
});

RegisterUICallback("ev-ui:setGPSMarker", async (data: any, cb: Function) => {
    SetWayPoint(Vector.fromObject(data.coords));
    cb({ data: {}, meta: { ok: true, message: "" } });
});

RegisterUICallback("ev-ui:jobCenterGroupReady", (data: any, cb: Function) => {
    RPC.execute("phone:jobCenterGroupReady", data.group_id, data.character.id);
    cb({ data: {}, meta: { ok: true, message: "" } });
});

RegisterUICallback("ev-ui:jobCenterGroupNotReady", (data: any, cb: Function) => {
    RPC.execute("phone:jobCenterGroupNotReady", data.group_id, data.character.id);
    cb({ data: {}, meta: { ok: true, message: "" } });
});

RegisterUICallback("ev-ui:jobCenterActivityAccept", async (data: any, cb: Function) => {
    const result = await RPC.execute("phone:jobCenterActivityAccept", data.activity_id, data.group_id, data.character.id);
    cb({ data: {}, meta: { ok: result, message: "" } });
});

RegisterUICallback("ev-ui:jobCenterActivityReject", (data: any, cb: Function) => {
    RPC.execute("phone:jobCenterActivityReject", data.activity_id, data.character.id);
    cb({ data: {}, meta: { ok: true, message: "" } });
});

RegisterUICallback("ev-ui:jobCenterActivityAbandon", (data: any, cb: Function) => {
    RPC.execute("phone:jobCenterActivityAbandon", data.activity.id, data.character.id);
    cb({ data: {}, meta: { ok: true, message: "" } });
});

RegisterUICallback("ev-ui:jobCenterCheckout", (data: any, cb: Function) => {
    JobCheckOut();
    cb({ data: {}, meta: { ok: true, message: "" } });
});

onNet("ev-ui:updateJobState", (pState: any) => {
    SendUIMessage({
        source: "ev-nui",
        app: "phone",
        data: {
            action: "jobs-update",
            state: pState
        }
    });
});

onNet("ev-ui:jobs:sendNotification", (pTitle: string, pBody: string, pShowEvenIfActive: boolean) => {
    SendUIMessage({
        source: "ev-nui",
        app: "phone",
        data: {
            action: "notification",
            target_app: "jobs",
            title: pTitle,
            body: pBody,
            show_even_if_app_active: pShowEvenIfActive
        }
    });
});

onNet("ev-ui:jobs:groupInviteRequest", (pRequestId: number, pGroupId: number, pMember: JobGroupMember) => {
    SendUIMessage({
        source: "ev-nui",
        app: "phone",
        data: {
            action: "job-group-join-request",
            member: pMember,
            group_id: pGroupId,
            request_id: pRequestId
        }
    });
});

onNet("ev-ui:jobs:groupInviteCompleted", (pRequestId: number, pAccepted: boolean) => {
    SendUIMessage({
        source: "ev-nui",
        app: "phone",
        data: {
            action: pAccepted ? "job-group-join-accept" : "job-group-join-deny",
            requestId: pRequestId
        }
    });
});

onNet("ev-ui:jobs:requestResponse", (pRequestId: string, pAction: string) => {
    SendUIMessage({
        source: "ev-nui",
        app: "phone",
        data: {
            action: pAction,
            requestId: pRequestId
        }
    });
});

onNet("ev-ui:jobs:groupActivityOffer", (pActivityId: any, pMessage: string, pGroupId: number) => {
    SendUIMessage({
        source: "ev-nui",
        app: "phone",
        data: {
            action: "job-group-offer-activity",
            activity_id: pActivityId,
            group_id: pGroupId,
            message: pMessage
        }
    });
});

onNet("ev-ui:jobs:pendingSelection", (pActivityId: any, pGotJob: boolean) => {
    SendUIMessage({
        source: "ev-nui",
        app: "phone",
        data: {
            action: "jobs-pending-selection",
            activity_id: pActivityId,
            got_job: pGotJob
        }
    });
});