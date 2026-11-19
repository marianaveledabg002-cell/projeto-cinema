import conexao from "../config/conexao.js";

const FilmeSchema = new conexao.Schema({
  nome: { type: String, required: true },
  genero: { type: String, required: true },
  duracao: { type: Number, required: false },
  anoLancamento: { type: Number, required: false },
  classificacao: { type: String, required: false },
  descricao: { type: String, required: false },
  foto:{type:Buffer}
});

const Filme = conexao.model("Filme", FilmeSchema);
export default Filme;
