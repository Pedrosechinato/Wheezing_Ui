function validaCpfCnpj(val) {
  const REGEX_CPF_CPNJ = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;
  return REGEX_CPF_CPNJ.test(val);
}

export default validaCpfCnpj;
