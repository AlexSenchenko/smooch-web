var Backbone = require('backbone');

var template = require('../templates/chatView.tpl');

var HeaderView = require('./headerView');
var ConversationView = require('./conversationView');
var ChatInputView = require('./chatInputView');
var _ = require("underscore");

var ChatView = Backbone.View.extend({
    events: {
        "focus #sk-wrapper": "resetUnread"
    },
    initialize: function() {
        this.listenTo(this.model, 'change', this.open);
    },
    render: function() {
        this.$el.html(template());

        this.header = new HeaderView({
            el: this.$el.find("#sk-header"),
            model: this.model
        });
        this.conversation = new ConversationView({
            el: this.$el.find("#sk-conversation"),
            model: this.model
        });

        this.chatInput = new ChatInputView({
            el: this.$el.find("#sk-footer"),
            model: this.model
        });

        this.header.render();
        this.conversation.render();
        this.chatInput.render();

        return this;
    },
    open: function() {
        this.enableAnimation();
        this.$el.find("#sk-container").removeClass("sk-close").addClass("sk-appear");
    },
    close: function() {
        this.enableAnimation();
        this.$el.find("#sk-container").removeClass("sk-appear").addClass("sk-close");
        this.model.resetUnread();
    },
    toggle: function() {
        this.enableAnimation();
        this.$el.find("#sk-container").toggleClass("sk-appear sk-close");
    },
    resetUnread: function() {
        this.model.resetUnread();
    },
    enableAnimation: function() {
        this.$el.find("#sk-container").removeClass("sk-noanimation");
    }
});

module.exports = ChatView;