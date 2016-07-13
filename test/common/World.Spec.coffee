describe 'World', ->
  it 'createGameObject', ->
    world = new World()
    go = world.createGameObject 'n'
    expect(go.name).to.equal 'n'
    expect(go.world).to.equal world

    expect(go.parent).to.equal world.root

  it 'update', ->
    world = new World()
    go = world.createGameObject()

    spy = sinon.spy go, 'update'

    world.update()
    expect(spy.callCount).to.equal 1
    expect(spy.calledWith 0).to.be.ok

    world.update 1
    expect(spy.callCount).to.equal 2
    expect(spy.calledWith 1).to.be.ok

    world.update 3
    expect(spy.callCount).to.equal 3
    expect(spy.calledWith 3).to.be.ok

  it 'eventDispatcher', ->
    world = new World()

    spy = sinon.spy world, 'update'
    world.on 'event', world, spy

    world.trigger 'event'
    expect(spy.callCount).to.equal 1
    expect(spy.calledWith()).to.be.true

    world.trigger 'event'
    expect(spy.callCount).to.equal 2

    world.off 'event', world, spy
    world.trigger 'event'
    expect(spy.callCount).to.equal 2
