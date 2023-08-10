const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie tile must be a string '
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).optional(),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Comedy', 'Drama',
      'Fantasy', 'Horror', 'Thriller', 'Romance', 'Biography',
      'Sci-Fi', 'Animation', 'Crime'])
  )

})

function validateMovie (object) {
  return movieSchema.safeParse(object)
}

function validatePartialMovie (input) {
  return movieSchema.partial().safeParse(input)
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
