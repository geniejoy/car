import { FactoriesModule } from './factories.module';

describe('FactoriesModule', () => {
  let factoriesModule: FactoriesModule;

  beforeEach(() => {
    factoriesModule = new FactoriesModule();
  });

  it('should create an instance', () => {
    expect(factoriesModule).toBeTruthy();
  });
});
