export declare abstract class UseCase<Req, Res> {
    abstract execute(req: Req): Promise<Res>;
}
