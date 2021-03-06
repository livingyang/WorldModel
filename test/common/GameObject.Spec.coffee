describe 'GameObject', ->
  it 'new', ->
    expect((new GameObject()).name).to.be.empty
    expect((new GameObject 'aaa').name).to.equal 'aaa'
    expect((new GameObject()).tag).to.equal ''

    o = new GameObject()
    expect(o.position).to.instanceof vec2

  it 'addComponent & getComponent & removeComponent', ->
    go = new GameObject()
    expect(go.getComponent Components.TestComponent).to.be.null

    c1 = go.addComponent Components.TestComponent
    expect(c1).to.be.instanceof Components.TestComponent
    expect(go.getComponent Components.TestComponent).to.equal c1

    # 可以绑定多个同样的Component
    c2 = go.addComponent Components.TestComponent
    expect(c1).to.be.instanceof Components.TestComponent
    expect(go.getComponent Components.TestComponent).to.equal c1

    go.removeComponent Components.TestComponent
    expect(go.getComponent Components.TestComponent).to.equal c2

    go.removeComponent Components.TestComponent
    expect(go.getComponent Components.TestComponent).to.be.null

  it 'update', ->
    go = new GameObject()
    c = go.addComponent Components.TestComponent

    spy = sinon.spy c, 'update'

    go.update 1
    expect(spy.callCount).to.equal 1
    expect(spy.calledWith 1).to.be.ok

    go.update 0.5
    expect(spy.callCount).to.equal 2
    expect(spy.calledWith 0.5).to.be.ok

  it 'isChild & removeChild & removeFromParent', ->
    world = new World()
    go = world.createGameObject()

    child1 = go.createChild()
    child2 = go.createChild()

    expect(child1.parent).to.equal go
    expect(child2.parent).to.equal go
    expect(go.isChild child1).to.ok
    expect(go.isChild child2).to.ok
    expect(go.children).deep.equal [child1, child2]

    go.removeChild child1
    world.update()
    expect(go.children).deep.equal [child2]

    child2.removeFromParent()
    world.update()
    expect(go.children).deep.equal []

    expect(child1.parent).to.null
    expect(child2.parent).to.null

  it 'removeAllChildren', ->
    world = new World()
    go = world.createGameObject()
    c1 = go.createChild()
    c2 = go.createChild()
    world.update()

    expect(go.children.length).to.equal 2
    go.removeAllChildren()
    world.update()
    expect(go.children.length).to.equal 0

    expect(c1.parent).to.null
    expect(c2.parent).to.null
