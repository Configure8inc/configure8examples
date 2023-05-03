export function undefinedValueFilter(answer) {
  return answer === '' ? undefined : answer;
}

export function listFilter(answer) {
  return answer === '' ? undefined : [...new Set(answer.split(',').map(tag => tag.trim()).filter(tag => tag !== ''))];
}

export function stoppableListFilter(answer) {
  if (answer === 'stop') return answer;
  return answer.split(',');
}