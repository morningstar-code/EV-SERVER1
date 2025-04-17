import { Base } from "@cpx/server";

export async function getCid(source: number): Promise<number> {
    for (const [key, value] of Object.entries(getPlayers())) {
        if (Number(value) === Number(source)) {
            const user: User = Base.getModule<PlayerModule>("Player").GetUser(source);
            if (!user) return 0;

            return user.character.id;
        }
    }

    return 0;
}