import conexao from "../config/conexao.js";

const DiretorSchema = new conexao.Schema({
  nome: { type: String, required: true },
  nascimento: { type: Number, required: true },
  filmes: { type: String, required: true }
});

const Diretor = conexao.model("Diretor", DiretorSchema);
export default Diretor;
