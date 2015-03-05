import Ember from 'ember';

export default Ember.Controller.extend({
  city: '',
  lat: '',
  lon: '',
  successful: false,

  actions: {
    retrieve: function () {
      var city = this.get('city'),
          self = this;

      Ember.$.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather',
        data: {q: city}
      }).done(function (data) {
        self.set('lat', data.coord.lat);
        self.set('lon', data.coord.lon);
        self.set('successful', true);
      }).fail(function (jqXHR, textStatus, errorThrown) {
        self.set('successful', false);
        Ember.Logger.error(errorThrown);
      });
    }
  }
});
