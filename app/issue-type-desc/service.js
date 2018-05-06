import Service from '@ember/service';

export default Service.extend({
  typeDescription: function(issue_type) {
    switch (issue_type) {
      case 'feed_fetch_invalid_url':
        return 'O hospedeiro, como especificado, pode não existir ou pode ter havido um problema de rede durante a busca.';
      case 'feed_fetch_invalid_source':
        return 'A Feed GTFS não contém todos os ficheiros necessários, ou houve um problema desconhecido com a busca.';
      case 'feed_fetch_invalid_response':
        return 'O hospedeiro respondeu, mas a feed GTFS não foi encontrada ou recuperada.';
      case 'feed_fetch_invalid_zip':
        return 'A estrutura do ficheiro zip não é suportada.';
    }
  },
});
