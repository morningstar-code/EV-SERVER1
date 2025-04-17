import moment from "moment";

export const fromNow = (date: any) => {
    const unix: any = moment.unix(date);

    const result = unix.isValid() ? unix.fromNow() : moment(date).utc().fromNow();

    return result;
}