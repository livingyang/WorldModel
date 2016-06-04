describe 'Component', ->
  before ->
    class Component.List.ComponentSpecComponent extends Component
      constructor: ->
        @enableCount = 0
        @disableCount = 0
        super

      onEnable: ->
        @enableCount++

      onDisable: ->
        @disableCount++

  after ->
    delete Component.List.ComponentSpecComponent

  it 'Component: 测试增加子类', ->
    expect(Component.List).to.include.keys 'ComponentSpecComponent'

  it 'update', ->
    go = new GameObject()
    c = go.addComponent 'ComponentSpecComponent'

    spy = sinon.spy c, 'update'
    go.update 0.1
    expect(spy.calledWith 0.1).to.be.true

  it 'onEnable: 先将 GameObject 添加到 World, 在添加Component', ->
    world = new World()
    go = world.createGameObject()
    c = go.addComponent 'ComponentSpecComponent'
    expect(c.enableCount).to.equal 1

  it 'onEnable & onDisable', ->
    world = new World()
    go = world.createGameObject()
    c = go.addComponent 'ComponentSpecComponent'

    expect(c.enableCount).to.equal 1
    expect(c.disableCount).to.equal 0

    go.removeFromParent()

    expect(c.enableCount).to.equal 1
    expect(c.disableCount).to.equal 1

  it '移除子结点时，属于子节点的树形结构的所有Component 都会调用 onEnable & onDisable', ->
    world = new World()
    go = world.createGameObject()
    child = go.createChild()

    c = child.addComponent 'ComponentSpecComponent'

    expect(c.enableCount).to.equal 1
    expect(c.disableCount).to.equal 0

    go.removeFromParent()

    expect(c.enableCount).to.equal 1
    expect(c.disableCount).to.equal 1

  it 'on & off & one & trigger', ->
    world = new World()
    go = world.createGameObject()
    c = go.addComponent 'ComponentSpecComponent'

    spy = sinon.spy c, 'update'
    spyOne = sinon.spy()
    c.on 'event', c, spy
    c.one 'event', spyOne

    c.trigger 'event'
    expect(spy.callCount).to.equal 1
    expect(spy.calledWith()).to.be.true
    expect(spyOne.callCount).to.equal 1

    c.trigger 'event'
    expect(spy.callCount).to.equal 2
    expect(spyOne.callCount).to.equal 1

    c.off 'event', c, spy
    c.trigger 'event'
    expect(spy.callCount).to.equal 2
