export class Book {
  constructor(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid book data');
    }
    
    this.id = Number(data.id);
    if (isNaN(this.id) || !data.id) {
      throw new Error('Book must have a valid ID');
    }
    
    this.title = String(data.title || 'Untitled');
    this.author = String(data.author || 'Unknown Author');
    this.published_year = data.published_year ? Number(data.published_year) : null;
    
    // Validate average_rating. If it's null or undefined, keep it null. Otherwise format as Number.
    this.average_rating = data.average_rating !== undefined && data.average_rating !== null 
      ? Number(data.average_rating) 
      : null;
  }
}
