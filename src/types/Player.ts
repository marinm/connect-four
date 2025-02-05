export enum PlayerStatus {
    Ready = "READY",
    Playing = "PLAYING",
}

export type Player = {
    id: string;
    name: string;
    status: PlayerStatus;
};
