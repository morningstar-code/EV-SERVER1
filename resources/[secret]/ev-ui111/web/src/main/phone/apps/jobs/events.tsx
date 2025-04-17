import { nuiAction } from "lib/nui-comms";
import { updatePhoneAppState } from "main/phone/actions";
import { DoPhoneNotification } from "main/phone/components/notifications/events";
import store from "./store";

export const icon = {
    background: '#90CAF9',
    color: 'white',
    name: 'people-carry'
}

function request(status: string) {
    return function (eventData) {
        const data = eventData.data;
        const state = eventData.state;

        DoPhoneNotification({
            apps: [],
            appName: 'jobs',
            icon: icon,
            id: `groups_${data.requestId}`,
            state: state,
            title: 'Requesting to Join',
            text: status === 'deny' ? 'Request Denied' : 'Joined Group!'
        });
    }
}

export default function events(cb) {
    let _0x34f422 = false;

    cb('jobs-update', (eventData) => {
        const data = eventData.data;
        const state = eventData.state;

        //console.log('jobs-update data', data);
        //console.log('jobs-update state', state);

        if (
            data?.state?.activity &&
            data?.state?.activity?.tasks &&
            data?.state?.activity?.tasks.length > 0
        ) {
            //console.log("jobs-update activity.tasks.length > 0", data.state.activity.tasks.length > 0);
            //console.log("jobs-update activity.tasks", data.state.activity.tasks);

            const foundTask = data.state.activity.tasks.find((task) => {
                return task.count < task.wanted;
            });

            if (foundTask || _0x34f422) {
                if (foundTask) {
                    _0x34f422 = false;
                    const title = foundTask.wanted > 1 ? `(${foundTask.count} / ${foundTask.wanted}) Current` : 'Current';

                    DoPhoneNotification({
                        apps: [],
                        appName: 'jobs',
                        icon: icon,
                        id: 'current-job',
                        state: state,
                        timeout: -1,
                        title: title,
                        text: foundTask.description
                    });
                }
            } else {
                _0x34f422 = true;
                DoPhoneNotification({
                    apps: [],
                    appName: 'jobs',
                    icon: icon,
                    id: 'current-job',
                    state: state,
                    timeout: 1500,
                    title: 'complete',
                    text: 'All tasks complete!'
                });

                //console.log("all tasks complete, setting activity to none.")

                return updatePhoneAppState(store.key, {
                    activity: "none"
                });
            }
        } else {
            //console.log("no tasks just loggin in to da job")
        }

        //Use some on objectives to see if count is over wanted on all tasks then set activity to "none"

        //console.log("jobs-update state", data.state);
        return updatePhoneAppState(store.key, {
            ...data.state,
        });
    });

    cb('job-group-join-deny', request('deny'));
    cb('job-group-join-accept', request('accept'));
    cb('job-group-join-request', (eventData) => {
        //console.log("job-group-join-request eventData", eventData);
        const data = eventData.data;
        const state = eventData.state;

        DoPhoneNotification({
            apps: [],
            appName: 'jobs',
            icon: icon,
            onAccept: () => {
                nuiAction('ev-ui:requestToJoinJobCenterGroupAccept', {
                    group_id: data.group_id,
                    member_id: data.member.id,
                    request_id: data.request_id,
                    character: state.character
                });
            },
            onAcceptText: 'Accept',
            onReject: () => {
                nuiAction('ev-ui:requestToJoinJobCenterGroupReject', {
                    group_id: data.group_id,
                    member_id: data.member.id,
                    request_id: data.request_id,
                    character: state.character
                });
            },
            onRejectText: 'Reject',
            state: state,
            text: `${data.member.first_name} ${data.member.last_name}`,
            title: 'Request to Join',
            timeout: -1
        });
    });
    cb('job-group-offer-activity', (eventData) => {
        const data = eventData.data;
        const state = eventData.state;

        //console.log("job-group-offer-activity activity_id", data.activity_id);

        DoPhoneNotification({
            apps: [],
            appName: 'jobs',
            icon: icon,
            id: `activity_${Number(data.activity_id)}`,
            onAccept: async () => {
                const results = await nuiAction('ev-ui:jobCenterActivityAccept', {
                    activity_id: data.activity_id,
                    character: state.character,
                    group_id: data.group_id
                });

                //setTimeout(() => {
                    DoPhoneNotification({
                        apps: [],
                        appName: 'jobs',
                        icon: icon,
                        id: `activity_${Number(data.activity_id)}`,
                        state: state,
                        text: results.meta.ok ? 'Job pending...' : 'Job was unavailable.',
                        title: 'Job Offer',
                        timeout: 5000
                    });
                //}, 32);
            },
            onAcceptOptions: {
                onAccept: null,
                onReject: null,
                dismiss: false,
                blockDismissOnClick: true,
                id: `activity_${Number(data.activity_id)}`,
                text: 'Accepting...',
                timeout: -1
            },
            onAcceptText: 'Accept',
            onReject: () => {
                nuiAction('ev-ui:jobCenterActivityReject', {
                    activity_id: data.activity_id,
                    character: state.character,
                    group_id: data.group_id
                });
            },
            onRejectText: 'Reject',
            state: state,
            text: data.message,
            title: 'Job Offer',
            timeout: 30000
        });
    });
    cb('jobs-pending-selection', (eventData) => {
        //Im guessing this get's called when it's done selecting the job (The meta.ok check is just for errors ig and then final thing is this event to tell them if they got or not)
        const data = eventData.data;
        const state = eventData.state;

        //console.log("jobs-pending-selection data", data);
        //console.log("jobs-pending-selection state", state);

        //console.log("jobs-pending-selection activity_id", data.activity_id);

        DoPhoneNotification({
            apps: [],
            appName: 'jobs',
            icon: icon,
            id: `selection_${Math.random() * 100000}`, //activity_${data.activity_id} //selection_${Math.random() * 100000}
            state: state,
            text: data.got_job ? 'Job starting!' : "Didn't get the job this time.",
            title: 'Job Update',
            timeout: 5000
        });
    });
}