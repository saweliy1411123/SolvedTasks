function ask(question, yes, no) {
    if (confirm(question)) yes()
    else no();
}

ask{
    "Вы согл?",
    () => console.log('y'),
    () => console.log('n')
};