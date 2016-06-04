class EventHandler
  onEvent: ->
  onDefaultEvent: ->
    
describe 'EventDispatcher', ->
  it 'init', ->
    dispatcher = new EventDispatcher()
    expect(dispatcher).to.be.an 'object'

  it 'on & off & trigger', ->
    handler = new EventHandler()
    spy1 = sinon.spy handler, 'onEvent'
    spy2 = sinon.spy handler, 'onDefaultEvent'

    dispatcher = new EventDispatcher()
    dispatcher.on 'event', handler, spy1
    dispatcher.on 'event', handler, spy2

    params = [1, '2', handler]
    dispatcher.trigger 'event', params...
    expect(spy1.callCount).to.equal 1
    expect(spy2.callCount).to.equal 1
    expect(spy1.calledWith params...).to.be.true

    dispatcher.trigger 'event'
    expect(spy1.callCount).to.equal 2
    expect(spy2.callCount).to.equal 2

    dispatcher.off 'event', handler, spy1
    dispatcher.trigger 'event'
    expect(spy1.callCount).to.equal 2
    expect(spy2.callCount).to.equal 3

    dispatcher.off 'event', handler, spy2
    dispatcher.trigger 'event'
    expect(spy1.callCount).to.equal 2
    expect(spy2.callCount).to.equal 3

  it 'on & off, default handler', ->
    handler = new EventHandler()
    spy = sinon.spy handler, 'onDefaultEvent'

    dispatcher = new EventDispatcher()
    dispatcher.on 'onDefaultEvent', handler

    params = [1, '2', handler]
    dispatcher.trigger 'onDefaultEvent', params...
    expect(spy.callCount).to.equal 1
    expect(spy.calledWith params...).to.be.true

    dispatcher.trigger 'onDefaultEvent'
    expect(spy.callCount).to.equal 2

    dispatcher.off 'onDefaultEvent', handler
    dispatcher.trigger 'onDefaultEvent'
    expect(spy.callCount).to.equal 2

  it 'one', ->
    handler = new EventHandler()
    spy = sinon.spy()

    dispatcher = new EventDispatcher()
    dispatcher.one 'event', spy

    params = [1, '2', handler]
    dispatcher.trigger 'event', params...
    expect(spy.callCount).to.equal 1
    expect(spy.calledWith params...).to.be.true

    dispatcher.trigger 'event'
    expect(spy.callCount).to.equal 1
