describe 'Component', ->
  it 'Component: 测试子类', ->
    expect(Components).to.include.keys 'TestComponent'

  it 'update', ->
    go = new GameObject()
    c = go.addComponent Components.TestComponent

    spy = sinon.spy c, 'update'
    go.update 0.1
    expect(spy.calledWith 0.1).to.be.true

  it 'onEnable & onDisable', ->
    world = new World()
    world.onEventMap
      OnTestComponentEnable: spyEnable = sinon.spy()
      OnTestComponentDisable: spyDisable = sinon.spy()
    go = world.createGameObject()
    c = go.addComponent Components.TestComponent

    expect(spyEnable.callCount).to.equal 1
    expect(spyDisable.callCount).to.equal 0
    expect(spyEnable.args[0]).to.deep.equal [c]

    go.removeFromParent()

    expect(spyEnable.callCount).to.equal 1
    expect(spyDisable.callCount).to.equal 1
    expect(spyDisable.args[0]).to.deep.equal [c]

  it '移除子结点时，属于子节点的树形结构的所有Component 都会调用 onEnable & onDisable', ->
    world = new World()
    world.onEventMap
      OnTestComponentEnable: spyEnable = sinon.spy()
      OnTestComponentDisable: spyDisable = sinon.spy()
    go = world.createGameObject()
    child = go.createChild()

    c = child.addComponent Components.TestComponent

    expect(spyEnable.callCount).to.equal 1
    expect(spyDisable.callCount).to.equal 0
    expect(spyEnable.args[0]).to.deep.equal [c]

    go.removeFromParent()

    expect(spyEnable.callCount).to.equal 1
    expect(spyDisable.callCount).to.equal 1
    expect(spyDisable.args[0]).to.deep.equal [c]

  it 'on & off & one & trigger', ->
    world = new World()
    go = world.createGameObject()
    c = go.addComponent Components.TestComponent

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
