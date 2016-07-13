describe 'TestComponent', ->
  context 'init', ->
    it 'test', ->
      world = new World()
      go = world.createGameObject()
      c = world.createGameObject().addComponent Components.TestComponent
      expect(c).to.instanceof Components.TestComponent
