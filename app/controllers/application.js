import Ember from 'ember';

export default Ember.Controller.extend({
  city: '',
  lat: 39,
  lng: -98,
  zoom: 2,
  isSuccessful: false,
  isError: false,
  errorMessage: '',

  actions: {
    retrieve: function () {
      var city = this.get('city'),
          self = this;

      Ember.$.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather',
        data: {q: city}
      }).done(function (data) {
        if (data.cod === '404') {
          self.set('lat', 39);
          self.set('lng', -98);
          self.set('zoom', 2);
          self.set('isSuccessful', false);
          self.set('isError', true);
          self.set('errorMessage', data.message);
        } else if (Ember.$.isNumeric(data.coord.lat) && Ember.$.isNumeric(data.coord.lon)) {
          self.set('lat', data.coord.lat);
          self.set('lng', data.coord.lon);
          self.set('zoom', 9);
          self.set('isSuccessful', true);
          self.set('isError', false);
        }
      }).fail(function (jqXHR, textStatus, errorThrown) {
        self.set('isSuccessful', false);
        Ember.Logger.error(errorThrown);
      });
    }
  }
});
