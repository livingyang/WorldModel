describe 'TestComponent', ->
  context 'init', ->
    it 'test', ->
      world = new World()
      c = world.createGameObjectWithComponent('TestComponent')
      expect(c).to.instanceof Component.getClass 'TestComponent'
