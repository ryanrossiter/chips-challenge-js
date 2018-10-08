// assumes list is already sorted in descending order
const sortedInsert = (arr, item) => {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] < item) {
			arr.splice(i, 0, item);
			return;
		}
	}

	arr.push(item);
}

export default class SortedSet {
	constructor() {
		this.keys = [];
		this.map = new Map();
	}

	insert(key, item) {
		if (this.map.has(key)) {
			this.map.get(key).splice(0, 0, item); // insert at 0
		} else {
			this.map.set(key, [item]);
			sortedInsert(this.keys, key);
		}
	}

	pop() {
		let k = this.keys[this.keys.length - 1];
		let a = this.map.get(k);
		let v = a.pop();
		if (a.length === 0) {
			this.map.delete(k);
			this.keys.pop();
		}

		return v;
	}
}
