import { moduleForWidget, widgetTest } from 'helpers/widget-test';
moduleForWidget('discourse-poll-standard-results');

const template = `{{mount-widget
                    widget="discourse-poll-standard-results"
                    args=(hash poll=poll isMultiple=isMultiple)}}`;

widgetTest('options in descending order', {
  template,

  setup() {
    this.set('poll', Ember.Object.create({
      options: [{ votes: 5 }, { votes: 4 }],
      voters: 9
    }));
  },

  test(assert) {
    assert.equal(this.$('.option .percentage:eq(0)').text(), '56%');
    assert.equal(this.$('.option .percentage:eq(1)').text(), '44%');
  }
});

widgetTest('options in ascending order', {
  template,

  setup() {
    this.set('poll', Ember.Object.create({
      options: [{ votes: 4 }, { votes: 5 }],
      voters: 9
    }));
  },

  test(assert) {
    assert.equal(this.$('.option .percentage:eq(0)').text(), '56%');
    assert.equal(this.$('.option .percentage:eq(1)').text(), '44%');
  }
});

widgetTest('multiple options in descending order', {
  template,

  setup() {
    this.set('isMultiple', true);
    this.set('poll', Ember.Object.create({
      type: 'multiple',
      options: [
        { votes: 5 },
        { votes: 2 },
        { votes: 4 },
        { votes: 1 }
      ],
      voters: 12
    }));
  },

  test(assert) {
    assert.equal(this.$('.option .percentage:eq(0)').text(), '41%');
    assert.equal(this.$('.option .percentage:eq(1)').text(), '33%');
    assert.equal(this.$('.option .percentage:eq(2)').text(), '16%');
    assert.equal(this.$('.option .percentage:eq(3)').text(), '8%');
  }
});
