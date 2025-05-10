export const requiredList = (v) => v.length > 0 || "Você deve selecionar ao menos uma opção";

export const requiredText = (v) => !!v || "O preenchimento deste campo é obrigatório";

export const limitaNumeroCaracteres = (v) => v.length <= 25 || "Máximo 25 caracteres";
