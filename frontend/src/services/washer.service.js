import http from "../http-common";

class WasherDataService {
	getAll() {
		return http.get("/washers");
	}

	get(id) {
		return http.get(`/washers/${id}`);
	}

	create(data) {
		return http.post("/washers", data);
	}

	update(id, data) {
		return http.put(`/washers/${id}`, data);
	}

	delete(id) {
		return http.delete(`/washers/${id}`);
	}

	deleteAll() {
		return http.delete(`/washers`);
	}

	findByTitle(title) {
		return http.get(`/washers?title=${title}`);
	}
}

export default new WasherDataService();