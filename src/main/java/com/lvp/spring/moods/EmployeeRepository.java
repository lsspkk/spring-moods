/*
 * Copyright 2015 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.lvp.spring.moods;

import org.springframework.data.repository.CrudRepository;

/**
 * @author Greg Turnquist
 *
 *
 * Tämä tekee luokista persistenttejä, eli ne tallentuu tietokantaan
 * Springille kerrotaan luokan/rajapinnan nimi ja id:n tyyppi
 * CRUD = create, read, update, delete
 */
// tag::code[]
public interface EmployeeRepository extends CrudRepository<Employee, Long> {

}
// end::code[]
