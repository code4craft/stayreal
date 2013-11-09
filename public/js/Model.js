app.Model = function () {
  
  return {
    
    CommentModel: Backbone.Model.extend({
      defaults: function() {
        return {
          time: this.curTime(),
          content: ''
        }
      },
      initialize: function() {
      },
      updateTime: function() {
        this.set('time', this.curTime());
        return this;
      },
      curTime: function () {
        format = 'MM-dd hh:mm:ss';
        time = new Date();
        var o = {
            'M+': time.getMonth() + 1,
            'd+': time.getDate(),
            'h+': time.getHours(),
            'm+': time.getMinutes(),
            's+': time.getSeconds(),
            'q+': Math.floor((time.getMonth() + 3) / 3),
            'S': time.getMilliseconds()
          },
          k;
        if(/(y+)/.test(format)) {
          format = format.replace(RegExp.$1, (time.getFullYear()+'')
                          .substr(4 - RegExp.$1.length));
        }
        for (k in o) {
          if (new RegExp('(' + k +')').test(format)) {
              format = format.replace(RegExp.$1, RegExp.$1.length ===1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
          }
        }
        return format;
      } 
    }),
    
    InputModel: Backbone.Model.extend({
      defaults: function() {
        return {
          value: '',
          editing: false
        }
      },
      initialize: function() {
      }, 
      edit: function() {
        return this.get('edting');
      }
    }),
    
    WorksModel: Backbone.Model.extend({
      defaults: function() {
        return {
          work: []
        }
      },
      getSize: function () {
        return this.get('work').length;
      }
    }),
    AblumModel: Backbone.Model.extend({
      defaults: function() {
        return {
          album: []
        }
      },
      getSize: function () {
        return this.get('album').length;
      }
    })
    
  }
  
}