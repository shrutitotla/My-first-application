const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const router = express.Router()

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
)

// Register
router.post('/register', async (req, res) => {
    const { email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const { data, error } = await supabase
        .from('users')
        .insert([{ email, password: hashedPassword }])
        .select()

    if (error) return res.status(400).json({ error: error.message })
    res.json({ message: 'User created successfully' })
})

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body

    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()

    if (error || !data) return res.status(400).json({ error: 'Invalid credentials' })

    const validPassword = await bcrypt.compare(password, data.password)
    if (!validPassword) return res.status(400).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ id: data.id, email: data.email }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.json({ token })
})

module.exports = router