app.View = function() {
  
  

  var IndexView = Backbone.View.extend({

    el: $('#page-index'),
    events: {
      'keyup input': 'unedit',
      'click #toServer': 'toServer'
    },
    initialize: function() {
    },
    template: {
      server: _.template($('#server-show-template').html())
    },
    render: function() {
      this.$el.val(this.model.inputModel.get('editing'));
      this.$el.toggleClass('editing', this.model.inputModel.edit());
      return this;
    },
    unedit: function(e) {
      var $target = $(e.currentTarget);
      if (!$target.val()) {
        $target.removeClass('has-input');
        this.model.serverModel.set($target.attr('name'), $target.attr('data-default-' + $target.attr('name')));
      } else {
        $target.addClass('has-input');
        var msg = new RegExp('[^0-9]').test($target.val());
        //do not have correct input && show err alert
        if(msg && $target.attr('ctype') === 'number') {
          $target.val($target.val().replace(/[^0-9]/g, ''));
          var alert = new AlertView({
            timeout: 1000,
            firstContent: 'err.',
          });
          alert.show({
            top: (e.target.offsetTop + 200) + 'px',
            left: (e.target.offsetLeft + 100) + 'px'
          });
        } else {
          this.model.serverModel.set($target.attr('name'), $target.val());
        }
      }
      //about server's show
      if(this.model.serverModel.ifNull()) {
        $('#server-show').html($('#server-show').attr('data-default'));
      } else {
        $('#server-show').html(this.template.server(this.model.serverModel.toJSON()));        
      }
    },
    toServer: function () {
      var server = $('[name="ip"]') + ':' + $('[name="port"]');
      //deal with server specified
    },
    show: function () {
      this.$el.show();
      //modify nav item
      var item0 = $('#header-nav-item0');
      item0.html('about');
      item0.attr('href', '#about');
      return this;
    },
    hide: function () {
      this.$el.hide();
    }
  });
  
  var AboutView = Backbone.View.extend({
    
    el: $('#page-about'),
    initialize: function () {
      var item0 = $('#header-nav-item0');
      item0.html('主页');
      item0.attr('href', '#index');
      //
      this.workModel = this.model.works[1];
      this.workView = new WorksView({
          model: this.workModel 
        });
    },
    events: {
      'click .album a': 'album'
    },
    template: _.template($('#works-album-template').html()),
    show: function () {
      $('.album').html(this.template(this.model.albums.toJSON()));
      this.$el.show();
      return this;
    },
    render: function () {
      return this;
    },
    album: function (e) {
      $target = $(e.target);
      var index =parseInt($target.attr('data-tag-index'));
      this.workModel = this.model.works[index];
      this.workView.resetModel(this.workModel).render();
      //tag
      $('.album').find('a').each(function(target, dom) {
        $(dom).removeClass('select');
      });
      $target.addClass('select');
    }
  });
  
  var WorksView = Backbone.View.extend({
    el: $('#myworks'),
    initialize: function () {
      $('.carousel').carousel({
        interval: 10000
      });
      // this.listenTo(this.model, 'change', this.render); 没有产生作用
      this.render();
    },
    events: {
      'click .carousel-inner img': 'official',  
    },
    template: {
      works: _.template($('#works-item-template').html()),
      indicators: _.template($('#works-indicator-template').html())
    },
    render: function () {
      $('.carousel-inner').html(this.template.works(this.model.toJSON()));
      $('.carousel-indicators').html(this.template.indicators({
        len: this.model.getSize()
      }));
    },
    official: function (e){
      window.open($(e.target).data().href);
    },
    resetModel: function (obj) {
      this.model = obj;
      return this;
    } 
  });
  
  var ServerView = Backbone.View.extend({
    el: $('#page-server'),
    initialize: function() {
      var item0 = $('#header-nav-item0');
      item0.html('主页');
      item0.attr('href', '#index');
    },
    template: {
      //_.template($('#').html())
    },
    render: function(){
      
    },
    show: function() {
      this.$el.show();
      return this;
    }
  });

  var AlertView = Backbone.View.extend({
    el: $('body'),
    initialize : function() {
      this.top = (screen.height - 50) + 'px',
      this.left = (screen.width - 50) + 'px',
      this.timeout = 1000;
      this.firstContent = '有错啦。。。';
    },
    template: _.template($('#alert-template').html()),
    show: function(options) {
      var that = this;
      this.alertView = $(this.template({
        top: options.top || this.top,
        left: options.left || this.left,
        firstContent: options.firstContent || this.firstContent
      }));
      this.$el.append(this.alertView);
      this.alertView.show();
      this.alertViewId = setTimeout(function() {
        that.alertView.hide();
        that.el.removeChild(that.alertView.get(0));
        clearTimeout(that.alertViewId);
      }, options.timeout || this.timeout);
    }
  });

  return {
    IndexView: IndexView,
    AboutView: AboutView,
    ServerView: ServerView
  }

}
