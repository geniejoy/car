import { FactoryModule } from './factory.module';

describe('Factory.Module.TsModule', () => {
  let factoryModuleTsModule: FactoryModule;

  beforeEach(() => {
    factoryModuleTsModule = new FactoryModule();
  });

  it('should create an instance', () => {
    expect(factoryModuleTsModule).toBeTruthy();
  });
});
