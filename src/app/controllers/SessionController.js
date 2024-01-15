import SessionService from "../service/SessionService";

class SessionController {
  async createSession(req, res) {

    const { email, password } = req.body;

    const session = await SessionService.createSessionService({ email, password });

    if (!session) {
      return res.status(400).json({
        status: false,
        message: "Ocorreu algum erro ao criar sessao. Tente novamente.",
      });
    }

    return res.status(200).json({ status: true, session });
  }
}

export default new SessionController();
