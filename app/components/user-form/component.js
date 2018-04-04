import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'form',
  userTypes: [
    "construtor_de_comunidades",
    "entusiasta_de_dados",
    "programador_de_aplicações",
    "fabricante_de_hardware",
    "consultor",
    "funcionário_de_operador_de_transportes",
    "funcionário_de_agência_pública"
  ],
  actions: {
    handleFocus(select) {
      select.actions.open();
    }
  }
});
