/**
 * Тип события, срабатывающего на изменение состояния без аргументов.
 */
declare type OnStateChanged = () => void;

/**
 * Тип события получающего данные об изменении состояния.
 */
declare type OnStateChangedEvent = <S, T extends StateChangedEvent<S>>(change: T) => void;

/**
 * Тип объекта события, описывающего изменения состояния.
 */
declare type StateChangedEvent<S> = {
    delta: DeepPartial<S>;
    actualState: S;
}

/**
 * Класс-состояние, с возможностью подписаться на изменения состояния.
 * Почти как в реакте :)
 */
export class StateKeeper<S> {

    constructor(state: S, handlers: Array<OnStateChanged>) {
        this._state = state;
        this._handlers = handlers;
    }

    private _state: S;
    private _handlers: Array<OnStateChanged | OnStateChangedEvent>;

    /**
     * Возвращает текущее состояние.
     */
    get state(): S {
        return this._state;
    }

    /**
     * Устанавливает текущее состояние и уведомляет всех подписчиков об изменении.
     * @param change дельта изменений между состояниями.
     */
    public setState(change: DeepPartial<S> | S): void {
        this._state = mergeObject(this.state, change) as S;
        const event: StateChangedEvent<S> = {
            delta: change,
            actualState: this._state
        }
        this._handlers.forEach(handler => handler(event))
    }

    public addHandler(onStateChanged: OnStateChanged | OnStateChangedEvent) {
        this._handlers.push(onStateChanged);
    }

}