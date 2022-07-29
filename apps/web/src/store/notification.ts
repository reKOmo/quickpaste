import { defineStore } from "pinia";

export enum NotificationTypes {
    NOTIFICATION = 1,
    ALERT = 2,
    CONFIRM = 3
}

export interface INotification {
    type: NotificationTypes,
    title: string,
    description: string
}

export class Notification implements INotification {
    constructor(resolve: any) {
        this.resolve = resolve;
    }
    resolve: any;
    type: NotificationTypes;
    title: string;
    description: string;

    done(a: unknown) {
        this.resolve(a);
    }

}

export interface NotificationsState {
    notifications: Notification[],
    alerts: Notification[]
}

const state = (): NotificationsState => ({
    notifications: [],
    alerts: []
});

const getters = {
    getAlerts: (state: NotificationsState) => (): Notification[] => {
        return state.alerts;
    },
    getNotifications: (state: NotificationsState) => (): Notification[] => {
        return state.notifications;
    },
};

export const useNotificationStore = defineStore("notificationStore", {
    state,
    getters,
    actions: {
        addNotification(noti: INotification): Promise<{ result: any }> {
            return new Promise((resolve) => {
                const n = new Notification(resolve);
                Object.assign(n, noti);
                switch (n.type) {
                    case NotificationTypes.ALERT:
                    case NotificationTypes.CONFIRM:
                        this.alerts.push(n);
                        break;
                    default:
                        this.notifications.push(n);
                        break;
                }
            });
        },
        shiftAlert() {
            this.alerts.shift();
        }
    }
});