router.post('/:id', async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) return res.status(404).json({ message: 'School not found' });

    school.votes += 1;
    await school.save();

    res.status(200).json({ message: 'Vote submitted', votes: school.votes });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting vote' });
  }
});
