import User from 'App/Models/User'
import test from 'japa'

test.group('User', () => {
  test('ensure user password gets hashed during save', async (assert) => {
    const user = new User()
    user.email = 'virk@adonisjs.com'
    user.password = 'secret'
    user.first_name = 'John'
    user.last_name = 'Doe'
    user.city = "Route du test"
    user.phone = "0606060606"
    user.address = "rooute du test"
    user.postal_code = "80000"
    await user.save()

    assert.notEqual(user.password, 'secret')
  })
})
