const ClassicGameMode = require('./CLASSIC');
class ARAMGameMode extends ClassicGameMode {
  constructor(ChampionSelectHandler, ProviderHandler) {
    super(ChampionSelectHandler, ProviderHandler, 'ARAM');
  }

  getPosition() {
    return null;
  }

  getProviders() {
    return [''];
  }
}

module.exports = ARAMGameMode;
