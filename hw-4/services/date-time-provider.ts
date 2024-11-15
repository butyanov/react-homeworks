export default class DateTimeProvider {
    private readonly UtcNow;
    
    constructor() {
        this.UtcNow = new Date()
    }
    
    get utcNow() {
        return this.UtcNow;
    }
}