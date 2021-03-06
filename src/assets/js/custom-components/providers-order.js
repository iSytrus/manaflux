module.exports = function(Mana) {
  const values = Object.values(Mana.providerHandler.providers);

  function toggle() {
    if (this.style.opacity === '0.35') {
      this.style.opacity = 1;
      Mana.getStore().set('providers-order-' + this.getAttribute('value'), true);
      console.log(2, `[Providers order] Enabled: ${this.getAttribute('value')}`);
    }
    else {
      this.style.opacity = '.35';
      Mana.getStore().set('providers-order-' + this.getAttribute('value'), false);
      console.log(2, `[Providers order] Disabled: ${this.getAttribute('value')}`);
    }
  }

  let list = '';
  for (let i = 0; i < values.length; i++)
  list += `<li class="ui-state-default sortable-button" value="${values[i].id}" style="${Mana.getStore().get('providers-order-' + values[i].id, true) ? 'opacity: 1' : 'opacity: .35'}">${values[i].name}</li>`;

  this.innerHTML = list;
  this.childNodes.forEach(x => x.addEventListener("dblclick", toggle));

  $(this).css('list-style', 'disc inside').sortable({
    update: function(event, ui) {
      if (ui.item.css('opacity') === '0.35') return $('#providersOrder').sortable('cancel');

      let array = [];
      $(this).children().each(function() {
        array.push($(this).attr('value'));
      });

      Mana.getStore().set('providers-order', array);
      console.log(2, `[Providers order] Changed value to: ${array}`);

      Sounds.play('checkboxClick');
    }
  });
};
