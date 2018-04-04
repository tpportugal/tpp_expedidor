import Controller from '@ember/controller';
import IssuesController from 'tpp-dispatcher/mixins/issues-controller';
import IssuesResolvingChangesetController from 'tpp-dispatcher/mixins/issues-resolving-changeset-controller';
import IssuesCloseController from 'tpp-dispatcher/mixins/issues-close-controller';

export default Controller.extend(IssuesController,
                                 IssuesResolvingChangesetController,
                                 IssuesCloseController, {
  selected: false,

  rootRoute: 'issues.feed-fetch',

  postSuccessTransition: function() {
    this.transitionToRoute('feeds.show', this.model.feed.get('onestop_id'));
  },

  getChanges: function() {
    let thisIssue = this.model.selectedIssue;
    var ret = {};
    ret['action'] = 'createUpdate';
    ret['issuesResolved'] = [ Number(thisIssue.get('id')) ];
    ret['feed'] = { onestopId: this.model.feed.get('onestop_id'),  url: this.model.feed.get('url') };
    return [ret];
  },

  actions: {
    closeDialog: function() {
      this.set('closeMessage', { show: true, message: 'Não é permitido fechar problemas de busca de Feeds.' } );
    },
    closeIssue: function() {
    }
  }
});
