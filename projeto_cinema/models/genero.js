import conexao from "../config/conexao.js";

const GeneroSchema = new conexao.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true }
});

const Genero = conexao.model("Genero", GeneroSchema);
export default Genero;
